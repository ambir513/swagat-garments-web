import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { FaGoogle } from "react-icons/fa";

const Social = ({
  isLoading = false,
  disabled = false,
}: {
  isLoading: Boolean;
  disabled: Boolean;
}) => {
  return (
    <Button
      variant={"outline"}
      className="flex gap-x-2 items-center w-full"
      disabled={disabled && true}
    >
      {isLoading && <Spinner />}{" "}
      <p className="flex justify-center items-center gap-x-2">
        <FaGoogle />
        <span>Continue with Google</span>
      </p>
    </Button>
  );
};

export default Social;
