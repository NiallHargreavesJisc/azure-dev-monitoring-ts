import VirtualMachineTable from "./VirtualMachineTable";
import React, {useEffect, useState} from "react";
import {virtualMachineTableParams} from "../main/interfaces/virtualMachineTableParams";

const FullVirtualMachineTable = ({vmList}: virtualMachineTableParams) => {

    let [runningVms, setRunningVms] = useState<number>(0)

    useEffect( () => {
        const fetchData = async () => {
            const running = vmList.filter(virtualMachine =>virtualMachine.powerState === '**RUNNING!**' )
            setRunningVms(running.length)
        }
        fetchData();
        // @ts-ignore

    },[] )


    return (
        <div className="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">There are {vmList.length}  virtual machines with {runningVms} running.</h2>
            <VirtualMachineTable vmList={vmList}/>
        </div>

        )

}

export default FullVirtualMachineTable