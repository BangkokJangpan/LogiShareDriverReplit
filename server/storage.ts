import { type Driver, type InsertDriver, type Vehicle, type InsertVehicle, type License, type InsertLicense, type Order, type InsertOrder, type Earning, type InsertEarning, type DriverProfile, type OrderWithEarnings } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Driver operations
  getDriver(id: string): Promise<Driver | undefined>;
  getDriverByEmail(email: string): Promise<Driver | undefined>;
  createDriver(driver: InsertDriver): Promise<Driver>;
  updateDriver(id: string, updates: Partial<Driver>): Promise<Driver>;
  getDriverProfile(driverId: string): Promise<DriverProfile | undefined>;

  // Vehicle operations
  getVehicleByDriverId(driverId: string): Promise<Vehicle | undefined>;
  createVehicle(vehicle: InsertVehicle): Promise<Vehicle>;
  updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle>;

  // License operations
  getLicenseByDriverId(driverId: string): Promise<License | undefined>;
  createLicense(license: InsertLicense): Promise<License>;
  updateLicense(id: string, updates: Partial<License>): Promise<License>;

  // Order operations
  getOrder(id: string): Promise<Order | undefined>;
  getOrdersByDriverId(driverId: string): Promise<OrderWithEarnings[]>;
  getPendingOrders(): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: string, updates: Partial<Order>): Promise<Order>;
  acceptOrder(orderId: string, driverId: string): Promise<Order>;

  // Earnings operations
  getEarningsByDriverId(driverId: string): Promise<Earning[]>;
  createEarning(earning: InsertEarning): Promise<Earning>;
  getDailyEarnings(driverId: string, date: string): Promise<Earning[]>;
  getWeeklyEarnings(driverId: string): Promise<Earning[]>;
}

export class MemStorage implements IStorage {
  private drivers: Map<string, Driver>;
  private vehicles: Map<string, Vehicle>;
  private licenses: Map<string, License>;
  private orders: Map<string, Order>;
  private earnings: Map<string, Earning>;

  constructor() {
    this.drivers = new Map();
    this.vehicles = new Map();
    this.licenses = new Map();
    this.orders = new Map();
    this.earnings = new Map();

    // Initialize with sample driver
    this.initializeSampleData();
  }

  private async initializeSampleData() {
    const driverId = randomUUID();
    const driver: Driver = {
      id: driverId,
      name: "김민수",
      email: "driver@logishare.com",
      phone: "010-1234-5678",
      rating: "4.9",
      totalDeliveries: 328,
      completionRate: "97.8",
      isOnline: true,
      createdAt: new Date(),
    };
    this.drivers.set(driverId, driver);

    const vehicle: Vehicle = {
      id: randomUUID(),
      driverId,
      licensePlate: "서울12가3456",
      model: "현대 포터 II",
      capacity: "1톤",
      insuranceExpiry: "2024.08.15",
    };
    this.vehicles.set(vehicle.id, vehicle);

    const license: License = {
      id: randomUUID(),
      driverId,
      licenseType: "1종 보통",
      licenseNumber: "11-23-456789-00",
      issueDate: "2018.03.15",
      renewalDate: "2025.03.15",
    };
    this.licenses.set(license.id, license);

    // Sample orders
    const orders = [
      {
        id: randomUUID(),
        orderNumber: "LS-2024-0158",
        driverId,
        pickupLocation: "홈플러스 강남점",
        deliveryLocation: "서울시 강남구 역삼동",
        status: "in_transit",
        estimatedTime: 25,
        distance: "8.5",
        fee: "12500",
        photoUrl: null,
        createdAt: new Date(),
        completedAt: null,
      },
      {
        id: randomUUID(),
        orderNumber: "LS-2024-0159",
        driverId: null,
        pickupLocation: "이마트 트레이더스 월드컵점",
        deliveryLocation: "서울시 마포구 상암동",
        status: "pending",
        estimatedTime: 25,
        distance: "8.5",
        fee: "15000",
        photoUrl: null,
        createdAt: new Date(),
        completedAt: null,
      },
      {
        id: randomUUID(),
        orderNumber: "LS-2024-0160",
        driverId: null,
        pickupLocation: "롯데마트 서울역점",
        deliveryLocation: "서울시 용산구 한강로",
        status: "pending",
        estimatedTime: 18,
        distance: "5.2",
        fee: "9500",
        photoUrl: null,
        createdAt: new Date(),
        completedAt: null,
      }
    ];

    orders.forEach(order => this.orders.set(order.id, order as Order));
  }

  async getDriver(id: string): Promise<Driver | undefined> {
    return this.drivers.get(id);
  }

  async getDriverByEmail(email: string): Promise<Driver | undefined> {
    return Array.from(this.drivers.values()).find(driver => driver.email === email);
  }

  async createDriver(insertDriver: InsertDriver): Promise<Driver> {
    const id = randomUUID();
    const driver: Driver = {
      ...insertDriver,
      id,
      createdAt: new Date(),
    };
    this.drivers.set(id, driver);
    return driver;
  }

  async updateDriver(id: string, updates: Partial<Driver>): Promise<Driver> {
    const existing = this.drivers.get(id);
    if (!existing) throw new Error("Driver not found");
    
    const updated = { ...existing, ...updates };
    this.drivers.set(id, updated);
    return updated;
  }

  async getDriverProfile(driverId: string): Promise<DriverProfile | undefined> {
    const driver = await this.getDriver(driverId);
    if (!driver) return undefined;

    const vehicle = await this.getVehicleByDriverId(driverId);
    const license = await this.getLicenseByDriverId(driverId);

    return {
      ...driver,
      vehicle,
      license,
    };
  }

  async getVehicleByDriverId(driverId: string): Promise<Vehicle | undefined> {
    return Array.from(this.vehicles.values()).find(vehicle => vehicle.driverId === driverId);
  }

  async createVehicle(insertVehicle: InsertVehicle): Promise<Vehicle> {
    const id = randomUUID();
    const vehicle: Vehicle = { ...insertVehicle, id };
    this.vehicles.set(id, vehicle);
    return vehicle;
  }

  async updateVehicle(id: string, updates: Partial<Vehicle>): Promise<Vehicle> {
    const existing = this.vehicles.get(id);
    if (!existing) throw new Error("Vehicle not found");
    
    const updated = { ...existing, ...updates };
    this.vehicles.set(id, updated);
    return updated;
  }

  async getLicenseByDriverId(driverId: string): Promise<License | undefined> {
    return Array.from(this.licenses.values()).find(license => license.driverId === driverId);
  }

  async createLicense(insertLicense: InsertLicense): Promise<License> {
    const id = randomUUID();
    const license: License = { ...insertLicense, id };
    this.licenses.set(id, license);
    return license;
  }

  async updateLicense(id: string, updates: Partial<License>): Promise<License> {
    const existing = this.licenses.get(id);
    if (!existing) throw new Error("License not found");
    
    const updated = { ...existing, ...updates };
    this.licenses.set(id, updated);
    return updated;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async getOrdersByDriverId(driverId: string): Promise<OrderWithEarnings[]> {
    const orders = Array.from(this.orders.values()).filter(order => order.driverId === driverId);
    return Promise.all(orders.map(async order => {
      const earning = Array.from(this.earnings.values()).find(e => e.orderId === order.id);
      return { ...order, earnings: earning };
    }));
  }

  async getPendingOrders(): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(order => order.status === "pending");
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      ...insertOrder,
      id,
      createdAt: new Date(),
      completedAt: null,
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const existing = this.orders.get(id);
    if (!existing) throw new Error("Order not found");
    
    const updated = { ...existing, ...updates };
    if (updates.status === "delivered") {
      updated.completedAt = new Date();
    }
    this.orders.set(id, updated);
    return updated;
  }

  async acceptOrder(orderId: string, driverId: string): Promise<Order> {
    return this.updateOrder(orderId, { driverId, status: "accepted" });
  }

  async getEarningsByDriverId(driverId: string): Promise<Earning[]> {
    return Array.from(this.earnings.values()).filter(earning => earning.driverId === driverId);
  }

  async createEarning(insertEarning: InsertEarning): Promise<Earning> {
    const id = randomUUID();
    const earning: Earning = {
      ...insertEarning,
      id,
      date: new Date(),
    };
    this.earnings.set(id, earning);
    return earning;
  }

  async getDailyEarnings(driverId: string, date: string): Promise<Earning[]> {
    const targetDate = new Date(date);
    return Array.from(this.earnings.values()).filter(earning => 
      earning.driverId === driverId && 
      earning.date.toDateString() === targetDate.toDateString()
    );
  }

  async getWeeklyEarnings(driverId: string): Promise<Earning[]> {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    return Array.from(this.earnings.values()).filter(earning => 
      earning.driverId === driverId && 
      earning.date >= weekAgo
    );
  }
}

export const storage = new MemStorage();
