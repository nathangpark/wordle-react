const rows = ["QWERTYUIOP","ASDFGHJKL","eZXCVBNMb"]

interface Props {
  greenKeys:String[];
  yellowKeys:String[];
  greyKeys:String[];
  onClick: (key:string) => void;
}

const KeyboardComponent = ({ greenKeys,yellowKeys,greyKeys,onClick }:Props) => {

  return (
    <div className="keyboard-parent">
      {rows.map((row:String, index:number)=>(
        <div className="keyboard-row"key={index}>
          {Array.from({length:row.length}).map((_,index:number) => (
            <div 
            className={
              "keyboard-key" + (
              greenKeys.includes(row.charAt(index)) ? ' green' :
              yellowKeys.includes(row.charAt(index)) ? ' yellow' :
              greyKeys.includes(row.charAt(index)) ? ' grey' :
              "")
            } 
            onClick={()=>onClick(
              row.charAt(index) == 'b' ? 'Backspace' :
              row.charAt(index) == 'e' ? 'Enter' : 
              row.charAt(index)
            )}
            key={row.charAt(index)}  
            >{
              row.charAt(index) == 'b' ? '<' :
              row.charAt(index) == 'e' ? 'Enter' : 
              row.charAt(index)
            }</div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default KeyboardComponent;