import {virtualMachineTableParams} from "../main/interfaces/virtualMachineTableParams";
import {useEffect, useState} from "react";
import VirtualMachineTable from "./VirtualMachineTable";

const JiraVirtualMachineTable = ({vmList}: virtualMachineTableParams) => {
    const [branchMap, setBranchMap] = useState<string[]>([])

    useEffect( () => {
        const branches: string[] = vmList.map(virtualMachine => {
            return virtualMachine.tags.Branch
        })
        let set1 = new Set(branches)
        let uniqueArray = Array.from(set1);
        setBranchMap(uniqueArray)
    },[] )

    const xyz = (branch: string) => {
        return vmList.filter(virtualMachine => virtualMachine.tags.Branch === branch)
    }

    return(
        <>
            {branchMap.length > 0 && branchMap.map(branch => {
                const vmList = xyz(branch)
                return (
                    <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6" key={branch}>
                        <h2 className="text-lg leading-6 font-medium text-gray-900">{branch}</h2>
                        <VirtualMachineTable vmList={vmList}/>
                    </div>
                )
                })
            }
        </>

    )

}

export default JiraVirtualMachineTable