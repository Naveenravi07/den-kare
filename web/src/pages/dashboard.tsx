import DashboardLayout from "../components/DashboardLayout"
import AppointmentsCard from "../components/AppointmentsCard"
import DoctorsCard from "../components/DoctorsCard"
import DutyCard from "../components/DutyCard"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"

// Types for our data
export type Appointment = {
    id: number
    patient: string
    clinicId: string
    doctorId: string
    time: string
    type: string
}

export type Doctor = {
    id: number
    name: string
    specialty: string
    status: string
}

export type DutyStatus = {
    initialStatus: boolean
    activeSince: string
}

export default function Dashboard() {

    const [appointments, setAppointments] = useState<Appointment[]>([])

    // Sample doctors data
    const doctors: Doctor[] = [
        { id: 1, name: "Dr. James Wilson", specialty: "Cardiology", status: "Available" },
        { id: 2, name: "Dr. Lisa Chen", specialty: "Neurology", status: "In Surgery" },
        { id: 3, name: "Dr. Mark Taylor", specialty: "Pediatrics", status: "Available" },
        { id: 4, name: "Dr. Anna Garcia", specialty: "Oncology", status: "With Patient" },
        { id: 5, name: "Dr. David Kim", specialty: "Orthopedics", status: "Available" },
    ]

    // Duty status data
    const dutyStatus: DutyStatus = {
        initialStatus: true,
        activeSince: "7Hrs",
    }

    // User data for navbar
    const user = {
        name: "Dr. Sarah Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
    }

    const fetchAppointements = async () => {
        try {
            let data = await fetch("http://localhost:8000/doctor/appointments")
            if (data.ok) {
                let res = await data.json()
                console.log(res)
                setAppointments(res)
            } else {
                // Use dummy data if backend is not available
                setAppointments([
                    { id: 1, patient: "John Doe", clinicId: "C001", doctorId: "D001", time: "10:00 AM", type: "Checkup" },
                    { id: 2, patient: "Jane Smith", clinicId: "C001", doctorId: "D002", time: "11:30 AM", type: "Consultation" },
                    { id: 3, patient: "Mike Johnson", clinicId: "C002", doctorId: "D001", time: "2:00 PM", type: "Follow-up" },
                ])
            }
        } catch (error) {
            // Use dummy data if backend is not reachable
            console.log("Backend not available, using dummy data")
            setAppointments([
                { id: 1, patient: "John Doe", clinicId: "C001", doctorId: "D001", time: "10:00 AM", type: "Checkup" },
                { id: 2, patient: "Jane Smith", clinicId: "C001", doctorId: "D002", time: "11:30 AM", type: "Consultation" },
                { id: 3, patient: "Mike Johnson", clinicId: "C002", doctorId: "D001", time: "2:00 PM", type: "Follow-up" },
            ])
        }
    }


    useEffect(() => {
        fetchAppointements()
    }, [])

    return (
        <div className="min-h-screen bg-[#111111] text-white">
            <Navbar user={user} />
            <DashboardLayout>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <AppointmentsCard appointments={appointments} />
                    <DoctorsCard doctors={doctors} />
                </div>
                <div className="mt-6">
                    <DutyCard dutyStatus={dutyStatus} />
                </div>
            </DashboardLayout>
        </div>
    )
}


