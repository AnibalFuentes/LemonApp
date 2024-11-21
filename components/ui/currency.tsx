import { useEffect, useState } from "react";

const formatPrice = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
});

interface CurrencyProps {
  value?: string | number;
}

const Currency: React.FC<CurrencyProps> = ({ value }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="font-semibold">{formatPrice.format(Number(value))}</div>
  );
};

export default Currency;
