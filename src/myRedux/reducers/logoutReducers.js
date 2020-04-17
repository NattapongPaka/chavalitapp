const initialState = {
  member_id: null,
  isFetching: false,
  isError: false,
  isLoad: 200,
  first_name: "",
  summary_point: "",
  summary_coin: ""

}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'clearMember':
      return {
        ...state,
        member_id: null,
        first_name: "",
        summary_point: "",
        summary_coin: ""
      };

    case 'Memset':
      return {
        ...state,
        member_id: action.payload,

      };

    case 'setData':
      return {
        ...state,
       
        first_name: action.payload.first_name,
        summary_point: action.payload.summary_point,
        summary_coin: action.payload.summary_coin
      };


      case 'Update':
      return {
        ...state,
        first_name: action.payload,
      };



      case 'addCoin':
      return {
        ...state,
               
        // summary_coin: action.payload 
        summary_coin: action.payload + parseInt(state.summary_coin)
       
      };


      // case 'NullMember':
      // return {
      //   ...state,
      //   member_id: null,
      //   first_name: "",
      //   summary_point: "",
      //   summary_coin: "",

      // };



    default:
      return state
  }

  
};






