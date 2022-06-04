import React, {useEffect, useState} from "react";
import '../../App.css'
import virtualMachineList from "../virtualmachine/VirtualMachineList";
import {VirtualMachineComplete} from "../interfaces/virtualMachine";
import FullVmListTable from "../../components/FullVirtualMachineTable";
import UserVirtualMachineTable from "../../components/UserVirtualMachineTable";
import JiraVirtualMachineTable from "../../components/JiraVirtualMachineTable";

const VirtualMachines = () => {

    const [view, setView] = useState('all')
    const [vmList, setVmList] = useState<VirtualMachineComplete[]>([])


    useEffect( () => {
        const fetchData = async () => {
            const vms = await virtualMachineList()
            setVmList(vms)
        }
        fetchData();
        // @ts-ignore

    },[] )

    return (
        <div>
            <h1>Virtual Machines</h1>
            <span className="relative z-0 inline-flex shadow-sm rounded-md">
                    <button onClick={() => setView('all')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >All VMs</button>
                    <button onClick={() => setView('user')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >VMs by User</button>
                    <button onClick={() => setView('branch')} type="button"
                            className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >VMs by Branch</button>
                </span>

            {view === 'all' && <FullVmListTable vmList={vmList}/>}
            {view === 'user' && <UserVirtualMachineTable vmList={vmList}/>}
            {view === 'branch' && <JiraVirtualMachineTable vmList={vmList}/>}


        </div>

    )
}

export default VirtualMachines