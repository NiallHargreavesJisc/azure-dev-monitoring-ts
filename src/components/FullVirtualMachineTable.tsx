import VirtualMachineTable from "./VirtualMachineTable";
import React, {useEffect, useState} from "react";
import {virtualMachineTableParams} from "../main/interfaces/virtualMachineTableParams";

const FullVirtualMachineTable = ({vmList}: virtualMachineTableParams) => {

    let [runningVms, setRunningVms] = useState<number>(0)

    useEffect( () => {
        const fetchData = async () => {

            const running = vmList.filter(virtualMachine =>virtualMachine.powerState === '**RUNNING!**' )
            setRunningVms(running.length)
            console.log(running.length)

        }
        fetchData();
        // @ts-ignore

    },[] )


    return (
        <div>
            <h2>There are {vmList.length}  virtual machines with {runningVms} running.</h2>
            <VirtualMachineTable vmList={vmList}/>
        </div>

        )

}

export default FullVirtualMachineTable