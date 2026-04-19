import { ReactNode } from 'react'

interface ButtonPrimaryProps {
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

export function ButtonPrimary({ children, size = 'md', className = '', onClick, type = 'button', disabled }: ButtonPrimaryProps) {
  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-2 font-display font-semibold rounded-pill
        text-white
        hover:opacity-90 hover:scale-[1.02] active:scale-[0.98]
        transition-all duration-150 cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]} ${className}`}
      style={{ background: 'linear-gradient(135deg, #FFB76C, #FF419D)' }}
    >
      {children}
    </button>
  )
}
