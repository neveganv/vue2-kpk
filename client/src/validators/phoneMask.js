export default function PhoneMask(value) {
	if (!value) return true;
	return /^([0-9]){9}$/.test(value);
}
