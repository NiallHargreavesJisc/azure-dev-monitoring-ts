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
                    <>
                        <h2>{branch}</h2>
                        <VirtualMachineTable vmList={vmList}/>
                    </>
                )
                })
            }
        </>

    )

}

export default JiraVirtualMachineTable