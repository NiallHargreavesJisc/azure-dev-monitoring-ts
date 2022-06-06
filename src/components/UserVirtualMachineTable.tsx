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
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">{creator}</h2>
                        <VirtualMachineTable vmList={vmList}/>
                    </div>
                )
            })
            }
        </>
    )

}

export default UserVirtualMachineTable