// import { useState, useContext, useEffect } from "react";
// import { useForm, Controller } from "react-hook-form";
// import { useHistory, Redirect } from "react-router-dom";
// import {
//     Form,
//     FormGroup,
//     Label,
//     Input,
//     FormFeedback,
//     FormText,
//     Container,
//     Button,
//     Alert,
//   } from "reactstrap";



// function Education() {
//     const [data, setData] = useState([]);
//   const { register, getValues, watch, handleSubmit, control } = useForm();
//   const at = watch("at", 2);
//   const prepend = () => {
//     setData([{ id: id() }, ...data]);
//   };

//   const append = () => {
//     setData([...data, { id: id() }]);
//   };

//   const remove = index => {
//     setData([...data.slice(0, index), ...data.slice(index + 1)]);
//   };

//   const update = index => {
//     const values = getValues();
//     const oldId = data[index].id;
//     const newId = values[`field${oldId}`];
//     setData([...data.slice(0, index), { id: newId }, ...data.slice(index + 1)]);
//   };

//   const insert = index => {
//     setData([
//       ...data.slice(0, index),
//       { result: "", id: id() },
//       ...data.slice(index)
//     ]);
//   };

//   const onSubmit = data => {
//     alert(JSON.stringify(data));
//   };

//   renderCount++;

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <h1>Field Array </h1>
//       <p>The following demo allow you to delete, append, prepend items</p>
//       <span className="counter">Render Count: {renderCount}</span>
//       <ul>
//         {data.map((item, index) => (
//           <li key={item.id}>
//             <Controller
//               as={<input />}
//               name={`field${item.id}`}
//               control={control}
//               defaultValue={item.id}
//             />
//             <button onClick={() => remove(index)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//       <section>
//         <button
//           type="button"
//           onClick={() => {
//             append();
//           }}
//         >
//           append
//         </button>
//         <button type="button" onClick={() => prepend()}>
//           prepend
//         </button>
//         <input name="at" ref={register} placeholder="Insert index" />
//         <button type="button" onClick={() => insert(parseInt(at, 10))}>
//           insert at
//         </button>
//       </section>

//       <input type="submit" />
//     </form>
//   );
// };
