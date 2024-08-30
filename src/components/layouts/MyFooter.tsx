import React from 'react'

interface MyFooterProps {
  content: string,
}

const MyFooter = (props: MyFooterProps) => {
  return (
    <React.Fragment>
      <div className="w-full p-4 text-slate-500 text-sm text-center">
        {props.content}
      </div>
    </React.Fragment>
  )
}

export default MyFooter;