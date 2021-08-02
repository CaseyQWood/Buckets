import React from 'react'
import BudgetActualExpected from '../components/graph'
import ProgressBar from '../components/progressBar'
import CategoriesProgressBar from '../components/categoriesProgressBar'
import OnlineChat from '../components/onlineChat'
import ChatButton from '../components/chatButton'

import { useState } from 'react'

export default function Profile() {

  // logic goes here
  //const 
  const [state, setState] = useState('noChat');

  const openChat = () => {
    setState('openChat');
  }

  return (
    <div class="graph">
      <BudgetActualExpected />
      <div class="category-bars">
        <ProgressBar currentValue={80} name={"Living Expenses"} spendLimit={'$1200.00'}/>
      </div>

      <div>
        {state === 'noChat' && (
        <ChatButton openChat={openChat} />
        )}
        {state === 'openChat' && <OnlineChat />}
      </div>
    </div>
  )
}