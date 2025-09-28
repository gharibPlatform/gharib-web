export const toggleSection = (section, setSections) => (event) => {
    event.stopPropagation();
    setSections((prev) => {
        const newState = { ...prev };
        Object.keys(newState).forEach((key) => {
            newState[key] = {
                rotation: key === section ? (newState[key].isOpen ? 90 : 270) : 90,
                isOpen: key === section ? !newState[key].isOpen : false,
            };
        });
        return newState;
    });
};

export const handleClickOutside = (dropdownRef, buttonRef, setSections) => (event) => {
    if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
    ) {
        setSections((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                newState[key] = { rotation: 90, isOpen: false };
            });
            return newState;
        });
    }
};