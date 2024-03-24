import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useHttp } from '../hooks/useHttp'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()
  const { http } = useHttp()
  const handleClick = async () => {
    if (!user) {
      return
    }

    const {json,response} = await http('/api/workout/'+ workout.id,{
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default WorkoutDetails