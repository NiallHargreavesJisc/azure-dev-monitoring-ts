import {useEffect, useState} from "react";
import {appServiceList} from "../main/utils/ApiHelper";
import {IAppService} from "../main/interfaces/appService";

interface AppServiceProps {
    rgName: string
    aspName: string
    environment: string
}

const AppService = ({rgName, aspName, environment}: AppServiceProps) => {

    const [asList, setAsList] = useState<IAppService[]>([])

    useEffect( () => {
        const fetchData = async () => {
            const asp = await appServiceList(rgName, aspName, environment)
            // @ts-ignore
            setAsList(asp)

        }
        fetchData();

    },[] )

    return (
        <div>
            {asList.length > 0 && asList.map(as => {
                return (
                    <>
                        <p>{as.name}</p>
                    </>

                )

            })}
        </div>
    )

}

export default AppService