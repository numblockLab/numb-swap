import { LoadingButton } from "@mui/lab";

export function BtnLoading({ title }: { title: string }) {
  return (
    <LoadingButton
      // color="primary"
      loading
      loadingPosition="center"
      // loadingIndicator={title}
      variant="outlined"
      fullWidth
    >
      {title}
    </LoadingButton>
  );
}
