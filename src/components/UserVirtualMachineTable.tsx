import {virtualMachineTableParams} from "../main/interfaces/virtualMachineTableParams";
import React, {useEffect, useState} from "react";
import virtualMachineList from "../main/virtualmachine/VirtualMachineList";
import VirtualMachineTable from "./VirtualMachineTable";

const UserVirtualMachineTable = ({vmList}: virtualMachineTableParams) => {

    const [creatorMap, setCreatorMap] = useState<string[]>([])

    useEffect( () => {
        const creators: string[] = vmList.map(virtualMachine => {
            return virtualMachine.tags["Jenkins User"]
        })
        let set1 = new Set(creators)
        let uniqueArray = Array.from(set1)
        setCreatorMap(uniqueArray)
    },[] )

    const xyz = (creator: string) => {
        return vmList.filter(virtualMachine => virtualMachine.tags["Jenkins User"] === creator)
    }

    return(
        <>
            {creatorMap.length > 0 && creatorMap.map(creator => {
                const vmList = xyz(creator)
                return (
                    <>
                        <h2>{creator}</h2>
                        <VirtualMachineTable vmList={vmList}/>
                    </>
                )
            })
            }
        </>
    )

}

export default UserVirtualMachineTable