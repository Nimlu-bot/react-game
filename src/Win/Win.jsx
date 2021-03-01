import React from 'react';
// import './stat.scss';


export default function Win(props) {

  return (
    <div className= {`stat-wrapper ${props.show===true ? '' :'hided' }`}>
			<p>WIN</p>
			<button 
						className='btn btn-outline-primary btn-sm'
						onClick={()=>{props.onClose()}}
						>close</button>
		</div>
  );
}