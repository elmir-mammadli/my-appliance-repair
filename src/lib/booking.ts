export interface OpenBookingDetail {
 appliance?: string;
}

export const openBookingModal = (detail?: OpenBookingDetail) => {
 if (typeof window !=='undefined') {
 window.dispatchEvent(new CustomEvent<OpenBookingDetail>('open-booking', { detail }));
 }
};
