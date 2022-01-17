import { IFormExp } from "../utils/interfaces";

interface Iprops {
    experience: IFormExp
}
export const Experience = (props: Iprops) => {

    return (
        <div className="border rounded mt-5 border-purple">
          <div className="w-full flex justify-between bg-purple">
          <h1 className="text-bgWhite">
               <em>
                   <strong>
                   {props.experience.name}
                   </strong>
               </em>
            </h1>
            <div>
                <span className="text-bgWhite">
                    {new Date(props.experience.startDate).toLocaleDateString()}
                </span>
                -
                {props.experience.endDate ? (
                    <span className="text-bgWhite">
                        {new Date(props.experience.endDate).toLocaleDateString()}

                    </span>
                ):null}

            </div>
          </div>
          <div className="w-full flex justify-start">
              <div className="m-1">
              <span className="m-1 ">
                  {props.experience.description}
              </span>
              </div>
          </div>
        </div>
    )
}