import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react"
import { BaseModal } from "../../components/modals/BaseModal";

interface Iuser {
  username: string;
  password: string;
}
interface Iprops {
  isLoggedIn: boolean;

}

interface Ierrors extends Imodal {
  error: boolean;
}

export const Login = (props: Iprops) => {
  const router = useRouter()
  const [errors, setErrors] = useState<Ierrors>({ error: false, title: "", message: "", cancel: () => { setErrors({ ...errors, error: false }) } })
  const [form, setForm] = useState<Iuser>({
    username: "",
    password: ""
  })
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.currentTarget.name]: e.target.value });
  }
  const submit = () => {
    axios.post("/api/login", form, {
      headers: {
        "content-type": "application/json"
      }
    })
      .then((res) => {
        router.push("/")
      })
      .catch((err: AxiosError) => {
        console.log("HÖRRI")
        setErrors({
          ...errors,
          title: "Error",
          message: err?.response?.data,

        })

        console.log(err.response)
      })
  }
  const logOut = async () => {

    await axios.post("/api/logout")
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <>
      <div className="flex flex-col relative items-center mt-24 max-h-screen justify-center  w-full " >

        {errors.title ? (
          <BaseModal title={errors.title} message={errors.message} cancel={errors.cancel} />
        ) : null}
        {props.isLoggedIn ? (
          <div>
            <h1>Du är redan inloggad.</h1>
            <button onClick={logOut}>Logga ut? </button>
          </div>
        ) : (
          <div className="border flex flex-col">
            <input name="username" className="text-2xl border border-purple"  type="text" onChange={onChange}></input>
            <input name="password" className="text-2xl border border-purple" type="password" onChange={onChange}></input>
     

            <button type='button' className="text-1xl hover:bg-red-500  p-3 bg-purple text-bgWhite drop-shadow-xl"
              onClick={submit}>
              Logga in
            </button>
          </div>
        )}
      </div>
    </>
  )
}
export default Login

// pages/admin.tsx

import { withIronSessionSsr } from "iron-session/next";
import { useRouter } from "next/router";
import { sessionOptions } from "../../utils/session";
import { Imodal } from "../../utils/interfaces";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;
    console.log(req.session.user)
    const isLoggedIn = user === true


    return {
      props: {
        isLoggedIn
      },
    };
  },
  sessionOptions
);
