import styled from 'styled-components'

export const Control = ({children, type, name, id, placeholder, value, func}) => {
  return (
	  <Group>
		  <div>
			<Label htmlFor={id}>{children}</Label>
		  </div>
		  <Input value={value} onChange={func} type={ type } name={ name } id={ id } placeholder={placeholder} />
	</Group>
  )
}

const Group = styled.div`
	margin-bottom: 10px;
	margin-right: 10px;
`;

const Label = styled.label`
	margin-right: 10px;
`;
const Input = styled.input`
 `;