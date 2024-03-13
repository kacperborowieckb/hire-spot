import type { PrismaClient, Rating, Recruitment } from "@prisma/client";
import { mockDeep } from "jest-mock-extended";
import { type AppRouter, appRouter } from "../../root";
import type { inferProcedureInput } from "@trpc/server";

jest.mock("uploadthing/server");

describe("Recruitment router", () => {
  it("Get recruitment should work without auth", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: null,
      db: prismaMock,
      headers: new Headers(),
    });

    await expect(
      async () => await caller.recruitment.getAllRecruitmentData(undefined),
    ).rejects.toThrow("UNAUTHORIZED");
  });

  it("Get recruitment query", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: "user",
      db: prismaMock,
      headers: new Headers(),
    });

    const createdAtMock = new Date();

    const mockOutput: (Recruitment & { candidates: { rating: Rating }[] })[] = [
      {
        id: "mockId",
        creatorId: "mockCreatorId",
        description: "mockDesc",
        position: "mockPosition",
        candidates: [
          { rating: "UNCHECKED" },
          { rating: "YES" },
          { rating: "NO" },
          { rating: "UNCHECKED" },
        ],
        createdAt: createdAtMock,
      },
    ];

    prismaMock.recruitment.findMany.mockResolvedValue(mockOutput);

    const query = await caller.recruitment.getAllRecruitmentData(undefined);

    expect(query).toStrictEqual([
      {
        candidates: 4,
        id: "mockId",
        position: "mockPosition",
        uncheckedCandidates: 2,
        createdAt: createdAtMock,
      },
    ]);
  });

  it("Get recruitment by id", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: "user",
      db: prismaMock,
      headers: new Headers(),
    });

    const mockOutput: (Recruitment & { creator: { username: string } }) | null =
      {
        creator: { username: "mockCreator" },
        creatorId: "mockCreatorId",
        description: "mockDesc",
        id: "mockInputId",
        position: "mock",
        createdAt: new Date(),
      };

    const input: inferProcedureInput<
      AppRouter["recruitment"]["getRecruitmentById"]
    > = { id: "mockInputId" };

    prismaMock.recruitment.findUnique.mockResolvedValue(mockOutput);

    const query = await caller.recruitment.getRecruitmentById(input);

    expect(query).toStrictEqual({
      ...mockOutput,
      creator: mockOutput.creator.username,
    });
  });

  it("Get recruitment by id should work without auth", () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: null,
      db: prismaMock,
      headers: new Headers(),
    });

    const input: inferProcedureInput<
      AppRouter["recruitment"]["getRecruitmentById"]
    > = { id: "mockInputId" };

    expect(
      async () => await caller.recruitment.getRecruitmentById(input),
    ).toBeTruthy();
  });

  it("addRecruitment should return id", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: "mockUser",
      db: prismaMock,
      headers: new Headers(),
    });

    const output: Recruitment = {
      creatorId: "mockCreatorId",
      description: "mockDesc",
      id: "mockId",
      position: "mockPosition",
      createdAt: new Date(),
    };

    prismaMock.recruitment.create.mockResolvedValue(output);

    const input: inferProcedureInput<
      AppRouter["recruitment"]["addRecruitment"]
    > = { description: "mockDescription", positionTitle: "mockPositionTitle" };

    const recruitmentId = await caller.recruitment.addRecruitment(input);

    expect(recruitmentId).toEqual("mockId");
  });
  it("addRecruitment should not work without auth", async () => {
    const prismaMock = mockDeep<PrismaClient>();
    const caller = appRouter.createCaller({
      currentUser: null,
      db: prismaMock,
      headers: new Headers(),
    });

    const input: inferProcedureInput<
      AppRouter["recruitment"]["addRecruitment"]
    > = { description: "mockDescription", positionTitle: "mockPositionTitle" };

    await expect(
      async () => await caller.recruitment.addRecruitment(input),
    ).rejects.toThrow("UNAUTHORIZED");
  });
});
