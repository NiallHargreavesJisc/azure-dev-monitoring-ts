import React, {useEffect, useState} from "react";
import '../../App.css'
import virtualMachineList from "../virtualmachine/VirtualMachineList";
import {VirtualMachineComplete} from "../interfaces/virtualMachine";
import axios from "axios";

const VirtualMachines = () => {

    const [vmList, setVmList] = useState<VirtualMachineComplete[]>([])
    let [runningVms, setRunningVms] = useState<number>(0)

    const liveBearer = 'BEARER eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiJodHRwczovL21hbmFnZW1lbnQuYXp1cmUuY29tLyIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0LzQ4ZjkzOTRkLThhMTQtNGQyNy04MmE2LWYzNWYxMjM2MTIwNS8iLCJpYXQiOjE2NTI3NzQxMDAsIm5iZiI6MTY1Mjc3NDEwMCwiZXhwIjoxNjUyNzc4MDAwLCJhaW8iOiJFMlpnWUVqY3ZzYWlwVVYxd3h3eHJuZS85RjRYQUFBPSIsImFwcGlkIjoiMTc0NWFkODMtNjk4NS00YWRiLTg3Y2ItYmZkZmNkNzM2OTYyIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNDhmOTM5NGQtOGExNC00ZDI3LTgyYTYtZjM1ZjEyMzYxMjA1LyIsImlkdHlwIjoiYXBwIiwib2lkIjoiY2ZjMWRkZjctNjcyNS00NzVkLWE4NWQtYjFhM2NhMjEzODQxIiwicmgiOiIwLkFRVUFUVG41U0JTS0owMkNwdk5mRWpZU0JVWklmM2tBdXRkUHVrUGF3ZmoyTUJNRkFBQS4iLCJzdWIiOiJjZmMxZGRmNy02NzI1LTQ3NWQtYTg1ZC1iMWEzY2EyMTM4NDEiLCJ0aWQiOiI0OGY5Mzk0ZC04YTE0LTRkMjctODJhNi1mMzVmMTIzNjEyMDUiLCJ1dGkiOiI4bVZEMy1PZUJFYThDRUlzTmhFS0FBIiwidmVyIjoiMS4wIiwieG1zX3RjZHQiOjEzNTM1MTA4MDl9.seuDGcXlyf4nEJTuxJblv9h-xlLgWqrT3ElWdoJU7jP8aRKJozpXP7cVGa9smBVIrdoB-W-2_Xq445cqw7gjZa5DDe6Uz2du9OmuNi_nP0LyCoujjhxyWCbLyKzgnX8LTw9yNIhomoCysz02WU3FCorJp43MQiPxhdN0gF-pixjNF6-etkO0NrNCK5Ru4drGTp6aom5c0qwfa_Ckg5qW39hkOlVVQFmcxtxB_xyuI_WMcle9ZPMeHqPq2hmh6Y0ladRgMARR5OfYKy5f4bWJGwHzV24IInYFnVsuWiDYNsivX8rBaoUWI0Tpf4O6KrlYdw13qPb7ImaN10CJlsaMng'

    // @ts-ignore
    useEffect( () => {
        const fetchData = async () => {
            const vms = await virtualMachineList()
            setVmList(vms)

            const running = vms.filter(virtualMachine =>virtualMachine.powerState === '**RUNNING!**' )
            setRunningVms(running.length)

        }
        fetchData();



        // @ts-ignore

    },[] )

    const changePowerState = async (vm: VirtualMachineComplete, newPowerState: string) => {

        const vmName = vm.name

        //const liveBearer: string =  //+ accessToken

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': liveBearer
            }
        }

        const url = 'https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines/' + vmName + '/' + newPowerState + '?api-version=2020-12-01'


        await axios.post(url, axiosConfig)
            .then(function (response: any) {
                const responseJson = response.data
                console.log(responseJson)
                console.log('Response {responseJson}')
            })
    }

    const deleteVirtualMachine = async (vm: VirtualMachineComplete) => {

        const vmName = vm.name

        //const liveBearer: string =  //+ accessToken

        const axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': liveBearer
            }
        }

        const url = 'https://management.azure.com/subscriptions/d87d8dde-ee41-4a1d-bb1f-baf4f54d644f/resourceGroups/RG_BuildResources/providers/Microsoft.Compute/virtualMachines/' + vmName + '/?api-version=2020-12-01'


        await axios.delete(url, axiosConfig)
            .then(function (response: any) {
                const responseJson = response.data
                console.log(responseJson)
                console.log('Response {responseJson}')
            })
    }

    return (
        <div>
            <h1>Virtual Machines</h1>
            <h2>There are {vmList.length}  virtual machines with {runningVms} running.</h2>
            <table>
                <tr>
                    <th>Vm Name</th>
                    <th>Vm Owner</th>
                    <th>Power State</th>
                    <th>Created Date</th>
                    <th>Project</th>
                    <th>Branch</th>
                    <th>IP Address</th>
                    <th>Commit ID</th>
                    <th>Type</th>
                    <th>Vm Status</th>
                    <th>Change Power State</th>
                    <th>Delete</th>
                </tr>
                {vmList.length > 0 && vmList.map(virtualMachine => {
                        return (
                            <tr>
                                <td>{virtualMachine.name}</td>
                                <td>{virtualMachine.tags["Jenkins User"]}</td>
                                <td>{virtualMachine.powerState}</td>
                                <td>{virtualMachine.tags["created Date"]}</td>
                                <td>{virtualMachine.tags.Project}</td>
                                <td>{virtualMachine.tags.Branch}</td>
                                <td>{virtualMachine.ipAddress}</td>
                                <td>{virtualMachine.tags.Commit}</td>
                                <td>{virtualMachine.tags.Type}</td>
                                <td>{virtualMachine.tags.Status}</td>
                                <td>
                                    {virtualMachine.powerState === '**RUNNING!**' &&
                                    <button onClick={() => {
                                        changePowerState(virtualMachine, 'deallocate')
                                    }}>Power Off</button>}
                                    {virtualMachine.powerState === 'Stopped' &&
                                    <button onClick={() => {
                                        changePowerState(virtualMachine, 'start')
                                    }}>Start</button>}
                                    {virtualMachine.powerState === 'Deallocated' &&
                                    <button onClick={() => {
                                        changePowerState(virtualMachine, 'start')
                                    }}>Start</button>}

                                </td>
                                <button onClick={() => {
                                    deleteVirtualMachine(virtualMachine)
                                }}>Delete</button>
                            </tr>
                        )
                    }
                )}
            </table>

        </div>

    )
}

export default VirtualMachines