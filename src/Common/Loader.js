import { ColorRing } from "react-loader-spinner";

const Loader = ({ loaderType,height ,width}) => {
    if (loaderType == "COLOR_RING") {
        return (<ColorRing
            visible={true}
            height={height}
            width={width}
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#C0D9FF', '#fff', '#C0D9FF', '#fff', '#C0D9FF']}
        />)
    }
};

export default Loader;
