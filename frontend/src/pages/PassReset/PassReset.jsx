import { axiosclient } from "../../api/axiosClient"

export default function PassReset() {
  return (
    <div>
      <button style={{"marginTop":"100px" ,"border":"2PX solid black"}} onClick={()=>{
        axiosclient.post('/password/email', {email: 'abourak07@gmail.com'}).then(
            (a)=>console.log(a)
        )}}>aaaaaaaaaaaaaa</button>
    </div>
  )
}
