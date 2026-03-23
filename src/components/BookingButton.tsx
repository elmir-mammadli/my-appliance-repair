'use client';

interface BookingButtonProps {
  className?: string;
  children: React.ReactNode;
}

export default function BookingButton({ className, children }: BookingButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent('open-booking'));
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}
