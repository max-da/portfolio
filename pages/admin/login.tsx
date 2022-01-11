import axios, { AxiosError } from "axios";
import { NextPage } from "next";
import { ChangeEvent, useState } from "react"
import { Navbar } from "../../components/Navbar";

interface Iuser {
    username: string;
    password: string;
}
export const Login = () => {
    const [form, setForm] = useState<Iuser>({
        username: "",
        password: ""
    })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.currentTarget.name]: e.target.value });
    }
    const submit = () => {
        axios.post("/api/login", form, {
            headers:{
                "content-type":"application/json"
            }
        })
        .then((res)=> {
            console.log(res)
        })
        .catch((err:AxiosError) => {
            console.log("HÖRRI")
            console.log(err)
        })
    }
    return (
        <>
            <Navbar />
            <div className="bg-emerald-500 border">
                <input name="username" type="text" onChange={onChange}></input>
                <input name="password" type="password" onChange={onChange}></input>
                <button onClick={submit}>lgoin</button>
            </div>
        </>
    )
}
export default Login