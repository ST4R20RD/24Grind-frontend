interface ModalChildren {
  children: JSX.Element;
}

export function Modal({ children }: ModalChildren) {
  return (
    <div className="bg-zinc-900 bg-opacity-80 fixed inset-0 z-50">
      <div className="flex h-screen justify-center items-center">
        {children}
      </div>
    </div>
  );
}
