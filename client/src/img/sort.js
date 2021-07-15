import React from 'react';

export const Sort = (props) => {
  // console.log('Sort', props);
  return (
    <svg height={props.size} width={props.size} fill={props.color} style={props.style} viewBox="0 0 24 24" >
      <path d="M7.41 14L11.3141 17.68C11.6993 18.0431 12.3007 18.0431 12.6859 17.68L16.59 14L18 15.332L13.3734 19.7026C12.6026 20.4308 11.3974 20.4308 10.6266 19.7026L6 15.332L7.41 14Z" />
      <path d="M16.59 10.2488L12.6859 6.56875C12.3007 6.20565 11.6993 6.20565 11.3141 6.56875L7.41 10.2488L6 8.91679L10.6266 4.54621C11.3974 3.81802 12.6026 3.81802 13.3734 4.54621L18 8.9168L16.59 10.2488Z" />
    </svg>
  )
}

export const SortDesc = (props) => {
  // console.log('Sort', props);
  return (
    <svg height={props.size} width={props.size} fill={props.color} style={props.style} viewBox="0 0 24 24" >
      <path d="M7.41 14L11.3141 17.68C11.6993 18.0431 12.3007 18.0431 12.6859 17.68L16.59 14L18 15.332L13.3734 19.7026C12.6026 20.4308 11.3974 20.4308 10.6266 19.7026L6 15.332L7.41 14Z" />
    </svg>

  )
}

export const SortAsc = (props) => {
  // console.log('Sort', props);
  return (
    <svg height={props.size} width={props.size} fill={props.color} style={props.style} viewBox="0 0 24 24" >
      <path d="M16.59 10.2488L12.6859 6.56875C12.3007 6.20565 11.6993 6.20565 11.3141 6.56875L7.41 10.2488L6 8.91679L10.6266 4.54621C11.3974 3.81802 12.6026 3.81802 13.3734 4.54621L18 8.9168L16.59 10.2488Z" />
    </svg>
  )
}


// x="0px" y="0px"
