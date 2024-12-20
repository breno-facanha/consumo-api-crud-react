import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {

  const [valor, setValor] = useState(0) 
  const [valorInput, setValorInput] = useState('Breno') 
  const [valorFetch, setValorFetch ] = useState<any[]>([])
  
  function mostrarNumeroAumentando(){
    setValor(valor + 1)
    console.log(setValor)
  }

  function mostrarNumeroDimunuindo(){
    setValor(valor - 1)
  }

  function mostrarInput(ele: any){
      setValorInput(ele.target.value)
  }

  function excluir(id: any){
    fetch('http://192.168.40.157:3000/dados/'+id,{method: 'DELETE'})
    .then(res=>res.json())
    .then(json=>console.log(json))
    console.log('item excluido', id)
  }

  useEffect(() => {
    fetch('http://192.168.40.157:3000/dados')
    .then(res=>res.json())
    .then(data=> {
      setValorFetch(data)
    })
  },[valorFetch])

  return (
    <>
    <div className="flex justify-center">
      <button className="m-3 w-[50px] h-[50px] bg-cyan-400 rounded-[50%]" onClick={mostrarNumeroAumentando}>+</button>
      <button className="m-3 w-[50px] h-[50px] bg-red-500 rounded-[50%]" onClick={mostrarNumeroDimunuindo}>-</button>
      <div>
      <p>{valor}</p>
      </div>
    </div>

    <div>
      <input type="text" onChange={mostrarInput} className="bg-gray-400"/>
    </div>
    <div >
      {valorInput}
    </div>
    <div>
      --------------------------------------------------
    </div>
    <div className=" px-3 relative overflow-x-auto shadow-md sm:rounded-lg">   
      <table className="px-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th  className="px-6 py-3">Id</th>
            <th  className="px-6 py-3">Titulo</th>
            <th  className="px-6 py-3">Preço</th>
            <th  className="px-6 py-3">categoria</th>
            <th  className="px-6 py-3">Imagen</th>
            <th  className="px-6 py-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {valorFetch.map(ele => 
          <tr key={ele.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td className="px-6 py-4">{ele.id}</td> 
            <td className="px-6 py-4">{ele.title}</td> 
            <td className="px-6 py-4">{ele.price}</td> 
            <td className="px-6 py-4">{ele.category}</td> 
            <td className="px-6 py-4"><img src={ele.image} alt="" className="w-[30px] h-[30px]" /></td> 
            <td className="px-6 py-4" >
              <button className="mr-4" onClick={() => console.log('clicou', ele.id)}>Edit</button>
              <button className="ml-4" onClick={() => excluir(ele.id)}>x</button>
            </td>

          </tr>
              
              )}

        </tbody>
      </table>
    </div>
    </>
  );
}
