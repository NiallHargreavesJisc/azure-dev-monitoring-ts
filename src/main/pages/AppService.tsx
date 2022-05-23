import React, {ReactElement, useEffect, useState} from "react";
import '../../App.css'
import {IResourceGroup} from "../interfaces/resourceGroup";
import {resourceGroupList} from "../utils/ApiHelper";
import ResourceGroup from "../../components/ResourceGroup"

const AppService = (): ReactElement => {
    // const appServices: void[] = await AppServicesList()
    const [liveRgList, setLiveRgList] = useState<IResourceGroup[]>([])
    const [devRgList, setDevRgList] = useState<IResourceGroup[]>([])

    useEffect( () => {
        const fetchData = async () => {
            const liveRg = await resourceGroupList('live')
            const devRg = await resourceGroupList('dev')
            // @ts-ignore
            setLiveRgList(liveRg)
            setDevRgList(devRg)

        }
        fetchData();


    },[] )

    return (
        <div>
            {devRgList.length > 0 && devRgList.map(resourceGroup => {
                return (
                    <div>
                        <ResourceGroup resourceGroup={resourceGroup} environment={'dev'}/>
                    </div>

                )
            })
            }
            {liveRgList.length > 0 && liveRgList.map(resourceGroup => {
                    return (
                        <div>
                            <ResourceGroup resourceGroup={resourceGroup} environment={'live'}/>
                        </div>

                    )
                })
            }

        </div>
    )

}



export default AppService