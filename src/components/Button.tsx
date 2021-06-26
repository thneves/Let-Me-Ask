import { ButtonHTMLAttributes } from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
};

export function Button({ isOutlined = false, ...props}) {
  return (
    <button className={`button ${isOutlined ? 'outlined' : ''}`}
     {...props}
      />
  )
}