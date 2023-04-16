import React from 'react'
import './StepIndicator.css';

interface StepIndicatorProps {
  status: InativosStatus
  site: Site
  active: boolean
}

const StepIndicator = (children: StepIndicatorProps) => {
  return (
      <div key={children.status.id} className={`stepIndicator ${children.active ? 'active' : ''} text-center`} >
        <p>{children.status.id}</p>
        <div className='stepLabel'>
          <span>{children.status.description}</span>
        </div>
      </div>
  )
}

export default StepIndicator
