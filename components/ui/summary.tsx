const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-row sm:flex-col p-4 rounded-lg bg-neutral-100">{children}</div>;
};
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-1 flex-col sm:flex-row">{children}</div>;
};
const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 justify-start sm:justify-center py-1 font-normal text-body sm:text-body text-nowrap text-neutral-500">
      {children}
    </div>
  );
};
const Content = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-1 justify-end sm:justify-center py-1 text-body sm:text-textbody text-nowrap">
      {children}
    </div>
  );
};
/**
 @example
 <Summary.Container>
  <Summary.Wrapper>
    <Summary.Header>header</Summary.Header>
    <Summary.Header>header</Summary.Header>
    <Summary.Header>header</Summary.Header>
  </Summary.Wrapper>
  <Summary.Wrapper>
    <Summary.Content>content</Summary.Content>
    <Summary.Content>content</Summary.Content>
    <Summary.Content>content</Summary.Content>
  </Summary.Wrapper>
</Summary.Container>
 */
const Summary = { Container, Wrapper, Header, Content };
export default Summary;
