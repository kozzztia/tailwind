import { Suspense } from 'react';
import './App.css'
import Header from './components/Header/Header'
import {list} from './constants/list'

function App() {

  return (
    <div className="app">
      <Header/>
      <Suspense fallback={<div className="w-full h-full flex justify-center items-center">Loading...</div>}>
                {list.map((item) => {
                        
                    const Component = item.component;
                    return (
                    <Component key={item.id} name={`${item.id}: ${item.name}`}/>
                    )
                })}
      </Suspense>
    </div>
  )
}

export default App
