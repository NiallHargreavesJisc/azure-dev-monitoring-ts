import {IAppServicePlan} from "../main/interfaces/appServicePlan";
import AppService from "./AppService";
import {ReactElement, useEffect, useState} from "react";
import {appServicePlanList} from "../main/utils/ApiHelper";

interface AppServicePlansProps {
    rgName: string
    environment: string
}

const AppServicePlans =  ({rgName, environment}: AppServicePlansProps): ReactElement => {

    const [aspList, setAspList] = useState<IAppServicePlan[]>([]);

    useEffect( () => {
        const fetchData = async () => {
            const asp = await appServicePlanList(rgName, environment)
            // @ts-ignore
            setAspList(asp)

        }
        fetchData();

    },[] )

    return (
        <div>
            {aspList.length > 0 && aspList.map(asp => {
                return (
                    <>
                        <p>{asp.name}</p>
                        <AppService rgName={rgName} aspName={asp.name} environment = {environment}/>
                    </>

                    )

            })}
        </div>
    )

}
export default AppServicePlans
