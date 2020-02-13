import React from 'react'

import { useMyHook } from 'use-class-name'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App
