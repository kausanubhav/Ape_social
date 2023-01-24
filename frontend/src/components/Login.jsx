import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { GoogleLogin } from '@react-oauth/google'
import socialApe from '../assets/socialApe.mp4'
import jwt_decode from 'jwt-decode'
import { client } from '../client'
import logo from '../assets/logoWhiteBg.svg'
export default function Login() {
    const navigate = useNavigate()

    const responseGoogle = (responses) => {
        const userInfo = jwt_decode(responses.credential)
        localStorage.setItem('user', JSON.stringify(userInfo))
        //sub is the unique google account id of the user
        const { name, sub: googleId, picture: img } = userInfo
        const doc = {
            _id: googleId,
            _type: 'user',
            userName: name,
            image: img,
        }

        client.createIfNotExists(doc).then(() => {
            navigate('/', { replace: true })
        })
    }
    return (
        <div className="item-center flex h-screen flex-col justify-start">
            <div className="relative h-full w-full">
                <video
                    src={socialApe}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-0 right-0 left-0 bottom-0 flex flex-col items-center justify-center bg-blackOverlay">
                    <div className="p-5">
                        {/* <div className="flex h-16 w-16 flex-row items-center justify-around bg-transparent">
                            <CameraSharp className="mr-1 text-lime-400" />
                            <h3 className="font-weight-600 text-3xl text-lime-400">SOCIALAPE</h3>
                        </div> */}
                        <img src={logo} alt="" className='w-24' />
                    </div>

                    <div className="shadow-2xl">
                        <GoogleLogin
                            client_id={process.env.REACT_APP_GOOGLE_API_TOKEN}
                            render={(renderProps) => (
                                <button
                                    type="button"
                                    onClick={renderProps.onClick}
                                    disabled={renderProps.disabled}
                                    className="flex cursor-pointer items-center justify-center rounded-lg bg-mainColor p-3 outline-none"
                                >
                                    <FcGoogle className="mr-4" /> Sign in with Google
                                </button>
                            )}
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy="single_host_origin"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
