
const saveBlockState = (blockState) => {
    blockState = JSON.stringify(blockState)
    console.log(blockState)
    localStorage.setItem("blockClipBoard", blockState)
}

export default saveBlockState

export const getBlockState = () => {
    return JSON.parse(localStorage.getItem("blockClipBoard"))
}