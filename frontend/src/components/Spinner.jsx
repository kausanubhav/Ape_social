import {Circles} from 'react-loader-spinner'

export default function Spinner({message}) {
  return (
      <div className="flex h-full w-full flex-col items-center justify-center">
          <Circles color="#00BFFF" height={50} width={200} className="m-5" />
          <p className="text-lg text-center px-2">{message}</p>
      </div>
  );
}