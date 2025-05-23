export function TableBody({ children, style = {}, ...props }) {
  return (
    <tbody style={style} {...props}>
      {children}
    </tbody>
  );
}
