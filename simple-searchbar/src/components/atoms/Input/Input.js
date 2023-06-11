import styled from "styled-components";

const StyledInputContainer = styled.div`
  margin-bottom: 20px;

  & input {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  & label {
    font-size: 18px;
    margin-bottom: 5px;
  }
`;

const Input = ({
  id,
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  onFocus,
  className,
}) => {
  const onChangeHanlder = (event) => {
    onChange(event.target.value);
  };
  const onBlurHanlder = () => {
    onBlur();
  };
  const onFocusHanlder = () => {
    onFocus();
  };

  return (
    <StyledInputContainer className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChangeHanlder}
        onBlur={onBlurHanlder}
        onFocus={onFocusHanlder}
      />
    </StyledInputContainer>
  );
};

Input.defaultProps = {
  placeholder: "",
  label: null,
  value: null,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
};

export default Input;
