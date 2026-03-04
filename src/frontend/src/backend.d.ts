import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface TourPackage {
    id: bigint;
    durationDays: bigint;
    title: string;
    featured: boolean;
    description: string;
    category: PackageCategory;
    priceUSD: bigint;
}
export interface Testimonial {
    id: bigint;
    starRating: bigint;
    clientName: string;
    reviewText: string;
    avatarLabel: string;
    location: string;
}
export enum PackageCategory {
    cultural = "cultural",
    desert = "desert",
    luxury = "luxury",
    heritage = "heritage"
}
export interface backendInterface {
    addTestimonial(testimonial: {
        starRating: bigint;
        clientName: string;
        reviewText: string;
        avatarLabel: string;
        location: string;
    }): Promise<bigint>;
    addTourPackage(pkg: {
        durationDays: bigint;
        title: string;
        featured: boolean;
        description: string;
        category: PackageCategory;
        priceUSD: bigint;
    }): Promise<bigint>;
    getAllPackages(): Promise<Array<TourPackage>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getPackage(id: bigint): Promise<TourPackage>;
    initialize(): Promise<void>;
    submitBooking(booking: {
        customerName: string;
        specialRequests?: string;
        destinationName: string;
        email: string;
        travelDate: string;
        phone: string;
        groupSize: bigint;
    }): Promise<bigint>;
}
