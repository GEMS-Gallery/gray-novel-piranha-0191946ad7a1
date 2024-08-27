export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'getRoomUrl' : IDL.Func([], [IDL.Text], ['query']),
    'healthCheck' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
