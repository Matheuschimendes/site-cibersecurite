import { useEffect, useRef } from "react";
import LogoSVG from "../../../public/logo.svg";  // Importando o SVG como um componente React

export const LoadingPage = () => {
  const logoRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (logo) {
      // Qualquer lógica extra, se necessário
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        /* Animação de agitação do SVG da logo */
        @keyframes shake {
          0% {
            transform: translateX(0); /* Posição inicial */
          }
          25% {
            transform: translateX(-10px); /* Move para a esquerda */
          }
          50% {
            transform: translateX(10px);  /* Move para a direita */
          }
          75% {
            transform: translateX(-10px); /* Move para a esquerda novamente */
          }
          100% {
            transform: translateX(0);  /* Retorna à posição original */
          }
        }

        /* Animação de desaparecimento após a agitação */
        @keyframes disappear {
          0% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        /* Apenas o SVG com a classe "logo-shake" será afetado */
        .logo-shake {
          width: 150px;
          height: 150px;
          animation: shake 1s ease-in-out, disappear 0.5s ease 1s forwards; /* Agita e desaparece rapidamente após 1s */
        }
      `}</style>

      <div className="flex justify-center items-center w-full h-full">
        {/* Aplica a animação ao seu SVG com a classe "logo-shake" */}
        <LogoSVG ref={logoRef} className="logo-shake" />
      </div>
    </>
  );
};
