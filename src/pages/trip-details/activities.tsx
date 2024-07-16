import { CircleCheck } from "lucide-react";
import { api } from "../../lib/axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Activity {
    date: string;
    activities: {
        id: string;
        title: string;
        occurs_at: string;
    }[]
}

export function Activities() {
    const { tripId } = useParams()
    const [activities, setActivities] = useState<Activity[]>([])

    useEffect(() => {
        api.get(`trips/${tripId}/activities`).then(response => setActivities(response.data.activities))
    }, [tripId])

    return (
        <div className="space-y-8">
            {activities.map(category => {
                const formattedDate = parseISO(category.date);
                return (
                    <div key={category.date} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">Dia {format(formattedDate, 'd')}</span>
                            <span className="text-xs text-zinc-500">{format(formattedDate, 'EEEE', { locale: ptBR })}</span>
                        </div>
                        {category.activities.length > 0 ? (
                            <div>
                                {category.activities.map(activity => {
                                    const formattedOccursAt = parseISO(activity.occurs_at);
                                    return (
                                        <div key={activity.id} className="space-y-2.5">
                                            <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
                                                <CircleCheck className="text-lime-300" width={20} height={20} />
                                                <span className="text-zinc-100">{activity.title}</span>
                                                <span className="text-zinc-400 text-sm ml-auto">
                                                    {format(formattedOccursAt, 'HH:mm')}h
                                                </span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada nessa data.</p>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
