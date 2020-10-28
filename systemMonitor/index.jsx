

// export const command = "ps -A -o %cpu | awk '{s+=$1} END {print s \"%\"}'"
export const command = "top -l 1 | grep -E '^CPU'; echo '-'; top -l 1 | grep -E '^Phys'"
export const refreshFrequency = 2000 // ms


export const className = `
bottom: 5vh;
left: 6vh;
.wrapper{
    background-color:rgba(42, 33, 57, 0.75);
    width:325px;
    height:auto;
  transition:0.3s all;
    padding:25px 50px;
    padding-top:15px;
    // outline:1px solid #EA3BA0;
}
.bars{
    display:flex;
    flex-wrap:nowrap;
    padding:2px;
    margin:5px;
    background:rgba(0,0,0,0.3);
}
.bar{
    box-sizing:border-box;
    height:25px;
    transition:0.3s all;
}
p{
position:relative;
    
    font-size:14px;
    font-family: Doubleplus;
    padding-left:5px;
}


`
  export const render = ({ output }) => {
      output = output.split(',');
      let crSplit = output[2].split('-');
      let cpUser = output[0];
      cpUser = cpUser.replace(/[^\d]*/, '');
      let cpuSystem = output[1].replace(/[^\d]*/, '');
      let cpuFree = crSplit[0].replace(/[^\d]*/, '');
      let ram = crSplit[1].replace(/[^\d]*/, '');
        const progress = [{10: "#218AF0"},
        {20: "#0099FE"},
        {30: "#437DE3"},
        {40: "#6270D5"},
        {50: "#8561C8"},
        {60: "#A654BB"},
        {70: "#C647AE"},
        {80: "#EA3BA0"},
        {90: "#EA3BA0"},
        {100: "#EA3BA0"}];
      return (
    <div className="wrapper" style={{boxShadow: cpuSystem.substring(0,2) < 10 ? '0px 0px 15px 4px #0099FE' : `0px 0px ${cpuSystem.charAt(0)*3}px ${cpuSystem.charAt(0)*2}px ${Object.values(progress[cpuSystem.charAt(0)])}`}}>
                <p style={{color: cpUser.substring(0,2) < 10 ? '#0099FE' : `${Object.values(progress[cpUser.charAt(0)])}` }}>{cpUser}</p>

        <div className="bars" >
        {progress.map((percent, index)=>{
            return(
                <div className="bar 10" 
                style={{
                    backgroundColor: ( parseInt(cpUser.substring(0,2)) >= parseInt(Object.keys(percent))  ? Object.values(percent) : ('rgba(0,0,0,0)')),
                    boxShadow: ( parseInt(cpUser.substring(0,2)) >= parseInt(Object.keys(percent))  ? `0px 0px 10px 4px ${Object.values(percent)}A6` : ('0px 0px 0px 0px rgba(0,0,0,0)')),
                    width: (cpUser.charAt(1) < 5 ? '10%' : ('15%')) }}
                >

            </div>
            );
        })}
        </div>
        <p style={{color: cpUser.substring(0,2) < 10 ? '#0099FE' : `${Object.values(progress[cpuSystem.charAt(0)])}` }}>{cpuSystem}</p>

    <div className="bars">
    {progress.map((percent, index)=>{
        return(
            <div className="bar 10" 
            style={{
                backgroundColor: ( parseInt(cpuSystem.substring(0,2)) >= parseInt(Object.keys(percent))  ? Object.values(percent) : ('rgba(0,0,0,0)')),
                boxShadow: ( parseInt(cpuSystem.substring(0,2)) >= parseInt(Object.keys(percent))  ? `0px 0px 10px 4px ${Object.values(percent)}A6` : ('0px 0px 0px 0px rgba(0,0,0,0)')),
                width: (cpuSystem.charAt(1) < 5 ? '10%' : ('15%')) }}
            >

        </div>
        );
    })}
    </div>
    <p style={{color: cpUser.substring(0,2) < 10 ? '#0099FE' : `${Object.values(progress[cpuFree.charAt(0)])}` }}>{cpuFree}</p>

    <div className="bars">
            {progress.map((percent, index)=>{
                return(
                    <div className="bar 10" 
                    style={{
                        backgroundColor: ( parseInt(cpuFree.substring(0,2)) >= parseInt(Object.keys(percent))  ? Object.values(percent) : ('rgba(0,0,0,0)')),
                        boxShadow: ( parseInt(cpuFree.substring(0,2)) >= parseInt(Object.keys(percent))  ? `0px 0px 10px 4px ${Object.values(percent)}A6` : ('0px 0px 0px 0px rgba(0,0,0,0)')),
                        width: (cpuFree.charAt(1) < 5 ? '10%' : ('15%')) }}
                    >

                </div>
                );
            })}
            </div>
   {/* <p>{ram}</p> */}
    </div>

  );
}

