import { Suspense } from 'react';
import './App.css'
import Header from './components/Header/Header'
import {list} from './constants/list'
import CardContainer from './components/ui-kit/Container/CardContainer';

function App() {

  return (
    <div className="app">
      <Header/>
      <Suspense 
        fallback={<div className="w-full h-full flex justify-center items-center font-bold">Loading . . .</div>}>
                {list.map((item) => {
                        
                    const Component = item.component;
                    return (
                    <CardContainer color={item.color} name={`${item.id}: ${item.name}`} key={item.id}>
                          <Component />
                    </CardContainer>

                    )
                })}
      </Suspense>
    </div>
  )
}

export default App
